"use client";

import { useState } from "react";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Input, Textarea } from "@heroui/input";
import { button as buttonStyles } from "@heroui/theme";
import { DateValue } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

import RequestLogin from "@/components/request-login";
import { useAuth } from "@/contexts/AuthContext";
import { CSKEventType, EventsService } from "@/lib/apiClient";

interface ResultData {
  type: "success" | "error";
  message: string;
}

type Result = ResultData | undefined;

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
  const { loading, isAdmin } = useAuth();

  // name, type, description, dateStart, place
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

  const [result, setResult] = useState<Result>(undefined);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      if (!type) {
        setTypeIsInvalid(true);
      }
      if (!dateStart) {
        setDateIsInvalid(true);
      }
      if (!place) {
        setPlaceIsInvalid(true);
      }
      if (!type || !dateStart || !place) {
        throw new Error("Vänligen fyll i alla fält.");
      }

      const eventData = {
        name,
        type,
        description,
        dateStart: dateStart?.toString(),
        place,
        requiresRegistration: false,
        requiresAttendance: false,
      };

      const { event: newEvent } = await EventsService.addEvent({ requestBody: eventData }); // Invalidate cache
      const eventId = newEvent.id;

      resetState();
      setResult({ type: "success", message: "Evenemang skapat!" });
      window.location.href = `/events/${eventId}`;
    } catch (err: any) {
      setResult({ type: "error", message: err.message });
    }
  };

  const defaultVariant = "bordered";

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {isAdmin ? (
        <form className="w-md mx-auto mt-20 flex max-w-full flex-col gap-2" onSubmit={handleSubmit}>
          <h2 className="w-full text-center text-lg font-semibold">Skapa nytt evenemang</h2>

          <Input
            required
            label="Namn på evenemanget"
            type="text"
            value={name}
            variant={defaultVariant}
            onChange={(e) => setName(e.target.value)}
          />

          <Dropdown>
            <DropdownTrigger>
              <Button
                color={typeIsInvalid ? "danger" : "default"}
                variant={defaultVariant}
                onPress={() => setTypeIsInvalid(false)}
              >
                {type ? eventTypeDbKeyToName[type] : "Välj typ"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              items={Object.entries(eventTypeDbKeyToName)}
              onAction={(key) => setType(key as CSKEventType)}
            >
              {(item) => <DropdownItem key={item[0]}>{item[1]}</DropdownItem>}
            </DropdownMenu>
          </Dropdown>

          <Textarea
            required
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
              isInvalid={dateIsInvalid}
              label="Datum och tid"
              value={dateStart}
              variant={defaultVariant}
              onChange={(e) => e && setDateStart(e)}
              onFocus={() => setDateIsInvalid(false)}
            />
          </I18nProvider>

          <Autocomplete
            allowsCustomValue
            inputValue={place}
            isInvalid={placeIsInvalid}
            items={Object.entries(autocompletePlaceNames)}
            label="Plats (välj från listan eller skriv egen)"
            variant={defaultVariant}
            onFocus={() => setPlaceIsInvalid(false)}
            onInputChange={(e) => setPlace(e)}
          >
            {(item) => <AutocompleteItem key={item[0]}>{item[1]}</AutocompleteItem>}
          </Autocomplete>

          {result && (
            <p className={result.type == "success" ? "text-green-500" : "text-red-500"}>
              {result.message}
            </p>
          )}

          <Button
            className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
            type="submit"
          >
            Skapa
          </Button>
        </form>
      ) : loading ? (
        <>Loading...</>
      ) : (
        <RequestLogin>Vänligen logga in som administratör för att skapa evenemang.</RequestLogin>
      )}
    </section>
  );
}
