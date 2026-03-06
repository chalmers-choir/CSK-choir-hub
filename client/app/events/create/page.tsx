'use client';

import { useActionState, useRef } from 'react';

import { Button } from '@heroui/button';
import { DatePicker } from '@heroui/date-picker';
import { Input, Textarea } from '@heroui/input';
import { button as buttonStyles } from '@heroui/theme';
import { I18nProvider } from '@react-aria/i18n';

import { type CreateEventActionState, createEventAction } from './actions';

const eventTypeDbKeyToName = {
  REHEARSAL: 'Rep',
  CONCERT: 'Konsert',
  GIG: 'Gig',
  PARTY: 'Fest',
  MEETING: 'Möte',
  OTHER: 'Annat',
} as const;

const autocompletePlaceNames = [
  'Klok',
  'Scaniasalen',
  'Kårrestaurangen',
  'Palmstedtsalen',
  'ML11',
  'SB-M500',
];

const defaultVariant = 'bordered';
const selectClassName =
  'h-14 rounded-large border border-default-200 bg-transparent px-3 text-sm outline-none focus:border-primary';
const initialCreateEventActionState: CreateEventActionState = { status: 'idle' };

export default function CreateEventPage() {
  const dateStartInputRef = useRef<HTMLInputElement>(null);

  const [actionState, submitCreateEvent, isSubmitting] = useActionState<
    CreateEventActionState,
    FormData
  >(createEventAction, initialCreateEventActionState);

  const fieldErrors = actionState.fieldErrors;
  const formErrorMessage = actionState.formError ?? null;

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <form
        className="w-md mx-auto mt-20 flex max-w-full flex-col gap-2"
        action={submitCreateEvent}
      >
        <h2 className="w-full text-center text-lg font-semibold">Skapa nytt evenemang</h2>

        <Input
          isRequired
          errorMessage={fieldErrors?.name}
          isInvalid={Boolean(fieldErrors?.name)}
          label="Namn på evenemanget"
          name="name"
          type="text"
          variant={defaultVariant}
        />

        <label className="text-sm" htmlFor="type">
          Typ
        </label>
        <select
          aria-invalid={Boolean(fieldErrors?.type)}
          className={selectClassName}
          id="type"
          name="type"
          required
        >
          <option value="">Välj typ</option>
          {Object.entries(eventTypeDbKeyToName).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {fieldErrors?.type && <p className="text-sm text-red-500">{fieldErrors.type}</p>}

        <Textarea
          errorMessage={fieldErrors?.description}
          isInvalid={Boolean(fieldErrors?.description)}
          label="Beskrivning"
          name="description"
          variant={defaultVariant}
        />

        <I18nProvider locale="sv-SE">
          <DatePicker
            classNames={{ label: 'after:content-none' }}
            granularity="minute"
            isInvalid={Boolean(fieldErrors?.dateStart)}
            label="Datum och tid"
            variant={defaultVariant}
            onChange={(value) => {
              if (dateStartInputRef.current) {
                dateStartInputRef.current.value = value ? value.toString() : '';
              }
            }}
          />
          <input ref={dateStartInputRef} name="dateStart" type="hidden" />
        </I18nProvider>
        {fieldErrors?.dateStart && <p className="text-sm text-red-500">{fieldErrors.dateStart}</p>}

        <Input
          isRequired
          errorMessage={fieldErrors?.place}
          isInvalid={Boolean(fieldErrors?.place)}
          label="Plats"
          list="autocompletePlaceNames"
          name="place"
          type="text"
          variant={defaultVariant}
        />
        <datalist id="autocompletePlaceNames">
          {autocompletePlaceNames.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        {fieldErrors?.place && <p className="text-sm text-red-500">{fieldErrors.place}</p>}

        {formErrorMessage && <p className="text-sm text-red-500">{formErrorMessage}</p>}

        <Button
          className={buttonStyles({ color: 'primary', radius: 'full', variant: 'shadow' })}
          isDisabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Skapar...' : 'Skapa'}
        </Button>
      </form>
    </section>
  );
}
