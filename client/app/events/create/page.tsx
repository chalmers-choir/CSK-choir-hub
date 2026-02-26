"use client";

import { startTransition, useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Input, Textarea } from "@heroui/input";
import { button as buttonStyles } from "@heroui/theme";
import { DateValue } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

import { CSKEventType } from "@/lib/apiClient";

import {
  type CreateEventActionState,
  createEventAction,
  initialCreateEventActionState,
} from "./actions";
import type { CreateEventActionInput } from "./schema";

const eventTypeDbKeyToName: Record<CSKEventType, string> = {
  REHEARSAL: "Rep",
  CONCERT: "Konsert",
  GIG: "Gig",
  PARTY: "Fest",
  MEETING: "Möte",
  OTHER: "Annat",
};

const autocompletePlaceNames: Record<string, string> = {
  klok: "Klok",
  scania: "Scaniasalen",
  kårres: "Kårrestaurangen",
  palmstedt: "Palmstedtsalen",
  maskin: "ML11",
  sbm500: "SB-M500",
};

export default function CreateEventPage() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [type, setType] = useState<CSKEventType | undefined>(undefined);
  const [typeIsInvalid, setTypeIsInvalid] = useState(false);

  const [description, setDescription] = useState("");

  const [dateStart, setDateStart] = useState<DateValue | null>(null);
  const [dateIsInvalid, setDateIsInvalid] = useState(false);

  const [place, setPlace] = useState("");
  const [placeIsInvalid, setPlaceIsInvalid] = useState(false);

  const resetState = () => {
    setName("");
    setType(undefined);
    setTypeIsInvalid(false);
    setDescription("");
    setDateStart(null);
    setDateIsInvalid(false);
    setPlace("");
    setPlaceIsInvalid(false);
  };

  const [clientValidationMessage, setClientValidationMessage] = useState<string | null>(null);

  const [actionState, submitCreateEvent, isSubmitting] = useActionState<
    CreateEventActionState,
    CreateEventActionInput
  >(createEventAction, initialCreateEventActionState);

  useEffect(() => {
    if (actionState.status !== "success" || !actionState.eventId) {
      return;
    }

    resetState();
    router.push(`/events/${actionState.eventId}`);
  }, [actionState, router]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setClientValidationMessage(null);

    const missingType = !type;
    const missingDate = !dateStart;
    const missingPlace = !place.trim();

    setTypeIsInvalid(missingType);
    setDateIsInvalid(missingDate);
    setPlaceIsInvalid(missingPlace);

    if (missingType || missingDate || missingPlace) {
      setClientValidationMessage("Vänligen fyll i alla obligatoriska fält.");

      return;
    }

    const payload: CreateEventActionInput = {
      name,
      type,
      description,
      dateStart: dateStart.toString(),
      place,
    };

    startTransition(() => {
      submitCreateEvent(payload);
    });
  };

  const defaultVariant = "bordered";
  const fieldErrors = actionState.fieldErrors;
  const formErrorMessage = clientValidationMessage ?? actionState.formError ?? null;
  const typeErrorMessage = fieldErrors?.type;
  const dateStartErrorMessage = fieldErrors?.dateStart;
  const placeErrorMessage = fieldErrors?.place;

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <form className="w-md mx-auto mt-20 flex max-w-full flex-col gap-2" onSubmit={handleSubmit}>
        <h2 className="w-full text-center text-lg font-semibold">Skapa nytt evenemang</h2>

        <Input
          required
          errorMessage={fieldErrors?.name}
          isInvalid={Boolean(fieldErrors?.name)}
          label="Namn på evenemanget"
          type="text"
          value={name}
          variant={defaultVariant}
          onChange={(e) => setName(e.target.value)}
        />

        <Dropdown>
          <DropdownTrigger>
            <Button
              color={typeIsInvalid || Boolean(typeErrorMessage) ? "danger" : "default"}
              variant={defaultVariant}
              onPress={() => {
                setTypeIsInvalid(false);
                setClientValidationMessage(null);
              }}
            >
              {type ? eventTypeDbKeyToName[type] : "Välj typ"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            items={Object.entries(eventTypeDbKeyToName)}
            onAction={(key) => {
              setType(key as CSKEventType);
              setTypeIsInvalid(false);
              setClientValidationMessage(null);
            }}
          >
            {(item) => <DropdownItem key={item[0]}>{item[1]}</DropdownItem>}
          </DropdownMenu>
        </Dropdown>
        {typeErrorMessage && <p className="text-sm text-red-500">{typeErrorMessage}</p>}

        <Textarea
          errorMessage={fieldErrors?.description}
          isInvalid={Boolean(fieldErrors?.description)}
          label="Beskrivning"
          type="text"
          value={description}
          variant={defaultVariant}
          onChange={(e) => setDescription(e.target.value)}
        />

        <I18nProvider locale="sv-SE">
          <DatePicker
            classNames={{ label: "after:content-none" }}
            granularity="minute"
            isInvalid={dateIsInvalid || Boolean(dateStartErrorMessage)}
            label="Datum och tid"
            value={dateStart}
            variant={defaultVariant}
            onChange={(e) => e && setDateStart(e)}
            onFocus={() => {
              setDateIsInvalid(false);
              setClientValidationMessage(null);
            }}
          />
        </I18nProvider>
        {dateStartErrorMessage && <p className="text-sm text-red-500">{dateStartErrorMessage}</p>}

        <Autocomplete
          allowsCustomValue
          inputValue={place}
          isInvalid={placeIsInvalid || Boolean(placeErrorMessage)}
          items={Object.entries(autocompletePlaceNames)}
          label="Plats (välj från listan eller skriv egen)"
          variant={defaultVariant}
          onFocus={() => {
            setPlaceIsInvalid(false);
            setClientValidationMessage(null);
          }}
          onInputChange={(e) => {
            setPlace(e);
            if (e.trim()) {
              setPlaceIsInvalid(false);
            }
          }}
        >
          {(item) => <AutocompleteItem key={item[0]}>{item[1]}</AutocompleteItem>}
        </Autocomplete>
        {placeErrorMessage && <p className="text-sm text-red-500">{placeErrorMessage}</p>}

        {formErrorMessage && <p className="text-sm text-red-500">{formErrorMessage}</p>}

        <Button
          className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
          isDisabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Skapar..." : "Skapa"}
        </Button>
      </form>
    </section>
  );
}
