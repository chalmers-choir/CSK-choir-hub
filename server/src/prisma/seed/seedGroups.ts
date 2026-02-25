import { GroupType, type PrismaClient } from "@prisma/generated/client";

import { type Users } from "./seedUsers";

export default async function seedGroups(prisma: PrismaClient, users: Users): Promise<Groups> {
  const csk = await prisma.group.create({
    data: {
      name: "Chalmers Sångkör",
      type: GroupType.OTHER,
      description: "Samtliga medlemmar i Chalmers Sångkör",
    },
  });

  const mk = await prisma.group.create({
    data: {
      name: "MK",
      type: GroupType.CHOIR,
      description: "Manskören",
      parents: { connect: [{ id: csk.id }] },
    },
  });

  const kk = await prisma.group.create({
    data: {
      name: "KK",
      type: GroupType.CHOIR,
      description: "Kammarkören",
      parents: { connect: [{ id: csk.id }] },
    },
  });

  const dk = await prisma.group.create({
    data: {
      name: "DK",
      type: GroupType.CHOIR,
      description: "Damkören",
      parents: { connect: [{ id: csk.id }] },
    },
  });

  const sa = await prisma.group.create({
    data: {
      name: "SA",
      type: GroupType.OTHER,
      description: "Altaner i CSK",
      parents: { connect: [{ id: csk.id }] },
    },
  });

  const tb = await prisma.group.create({
    data: {
      name: "TB",
      type: GroupType.OTHER,
      description: "Basorer i CSK",
      parents: { connect: [{ id: csk.id }] },
    },
  });

  const s = await prisma.group.create({
    data: {
      name: "S",
      type: GroupType.OTHER,
      description: "Sopraner i CSK",
      parents: { connect: [{ id: sa.id }] },
    },
  });

  const s1 = await prisma.group.create({
    data: {
      name: "S1",
      type: GroupType.VOICE,
      description: "1Sopraner i CSK",
      parents: { connect: [{ id: s.id }] },
    },
  });

  const s2 = await prisma.group.create({
    data: {
      name: "S2",
      type: GroupType.VOICE,
      description: "2Sopraner i CSK",
      parents: { connect: [{ id: s.id }] },
    },
  });

  const a = await prisma.group.create({
    data: {
      name: "A",
      type: GroupType.OTHER,
      description: "Altar i CSK",
      parents: { connect: [{ id: sa.id }] },
    },
  });

  const a1 = await prisma.group.create({
    data: {
      name: "A1",
      type: GroupType.VOICE,
      description: "1Altar i CSK",
      parents: { connect: [{ id: a.id }] },
    },
  });

  const a2 = await prisma.group.create({
    data: {
      name: "A2",
      type: GroupType.VOICE,
      description: "2Altar i CSK",
      parents: { connect: [{ id: a.id }] },
    },
  });

  const t = await prisma.group.create({
    data: {
      name: "T",
      type: GroupType.OTHER,
      description: "Tenorer i CSK",
      parents: { connect: [{ id: tb.id }] },
    },
  });

  const t1 = await prisma.group.create({
    data: {
      name: "T1",
      type: GroupType.VOICE,
      description: "1Tenorer i CSK",
      parents: { connect: [{ id: t.id }] },
    },
  });

  const t2 = await prisma.group.create({
    data: {
      name: "T2",
      type: GroupType.VOICE,
      description: "2Tenorer i CSK",
      parents: { connect: [{ id: t.id }] },
    },
  });

  const b = await prisma.group.create({
    data: {
      name: "B",
      type: GroupType.OTHER,
      description: "Basar i CSK",
      parents: { connect: [{ id: tb.id }] },
    },
  });

  const b1 = await prisma.group.create({
    data: {
      name: "B1",
      type: GroupType.VOICE,
      description: "1Basar i CSK",
      parents: { connect: [{ id: b.id }] },
    },
  });

  const b2 = await prisma.group.create({
    data: {
      name: "B2",
      type: GroupType.VOICE,
      description: "2Basar i CSK",
      parents: { connect: [{ id: b.id }] },
    },
  });

  const kks = await prisma.group.create({
    data: {
      name: "KKS",
      type: GroupType.OTHER,
      description: "Sopraner i KK",
      parents: { connect: [{ id: kk.id }, { id: s.id }] },
    },
  });

  const kks1 = await prisma.group.create({
    data: {
      name: "KKS1",
      type: GroupType.OTHER,
      description: "1Sopraner i KK",
      parents: { connect: [{ id: kks.id }, { id: s1.id }] },
    },
  });

  const kks2 = await prisma.group.create({
    data: {
      name: "KKS2",
      type: GroupType.OTHER,
      description: "2Sopraner i KK",
      parents: { connect: [{ id: kks.id }, { id: s2.id }] },
    },
  });

  const kka = await prisma.group.create({
    data: {
      name: "KKA",
      type: GroupType.OTHER,
      description: "Altor i KK",
      parents: { connect: [{ id: kk.id }, { id: a.id }] },
    },
  });

  const kka1 = await prisma.group.create({
    data: {
      name: "KKA1",
      type: GroupType.OTHER,
      description: "1Altor i KK",
      parents: { connect: [{ id: kka.id }, { id: a1.id }] },
      members: { connect: [{ id: users.rebekka.id }] },
    },
  });

  const kka2 = await prisma.group.create({
    data: {
      name: "KKA2",
      type: GroupType.OTHER,
      description: "2Altor i KK",
      parents: { connect: [{ id: kka.id }, { id: a2.id }] },
      members: { connect: [{ id: users.ingrid.id }] },
    },
  });

  const kkt = await prisma.group.create({
    data: {
      name: "KKT",
      type: GroupType.OTHER,
      description: "Tenorer i KK",
      parents: { connect: [{ id: kk.id }, { id: t.id }] },
    },
  });

  const kkt1 = await prisma.group.create({
    data: {
      name: "KKT1",
      type: GroupType.OTHER,
      description: "1Tenorer i KK",
      parents: { connect: [{ id: kkt.id }, { id: t1.id }] },
    },
  });

  const kkt2 = await prisma.group.create({
    data: {
      name: "KKT2",
      type: GroupType.OTHER,
      description: "2Tenorer i KK",
      parents: { connect: [{ id: kkt.id }, { id: t2.id }] },
    },
  });

  const kkb = await prisma.group.create({
    data: {
      name: "KKB",
      type: GroupType.OTHER,
      description: "Basar i KK",
      parents: { connect: [{ id: kk.id }, { id: b.id }] },
    },
  });

  const kkb1 = await prisma.group.create({
    data: {
      name: "KKB1",
      type: GroupType.OTHER,
      description: "1Basar i KK",
      parents: { connect: [{ id: kkb.id }, { id: b1.id }] },
      members: { connect: [{ id: users.liam.id }] },
    },
  });

  const kkb2 = await prisma.group.create({
    data: {
      name: "KKB2",
      type: GroupType.OTHER,
      description: "2Basar i KK",
      parents: { connect: [{ id: kkb.id }, { id: b2.id }] },
      members: { connect: [{ id: users.lucas.id }] },
    },
  });

  const dks1 = await prisma.group.create({
    data: {
      name: "DKS1",
      type: GroupType.OTHER,
      description: "1Sopraner i DK",
      parents: { connect: [{ id: dk.id }, { id: s1.id }] },
    },
  });

  const dks2 = await prisma.group.create({
    data: {
      name: "DKS2",
      type: GroupType.OTHER,
      description: "2Sopraner i DK",
      parents: { connect: [{ id: dk.id }, { id: s2.id }] },
    },
  });

  const dka1 = await prisma.group.create({
    data: {
      name: "DKA1",
      type: GroupType.OTHER,
      description: "1Alt i DK",
      parents: { connect: [{ id: dk.id }, { id: a1.id }] },
    },
  });

  const dka2 = await prisma.group.create({
    data: {
      name: "DKA2",
      type: GroupType.OTHER,
      description: "2Alt i DK",
      parents: { connect: [{ id: dk.id }, { id: a2.id }] },
    },
  });

  const mkt1 = await prisma.group.create({
    data: {
      name: "MKT1",
      type: GroupType.OTHER,
      description: "1Tenorer i MK",
      parents: { connect: [{ id: mk.id }, { id: t1.id }] },
    },
  });

  const mkt2 = await prisma.group.create({
    data: {
      name: "MKT2",
      type: GroupType.OTHER,
      description: "2Tenorer i MK",
      parents: { connect: [{ id: mk.id }, { id: t2.id }] },
    },
  });

  const mkb1 = await prisma.group.create({
    data: {
      name: "MKB1",
      type: GroupType.OTHER,
      description: "1Basar i MK",
      parents: { connect: [{ id: mk.id }, { id: b1.id }] },
      members: {
        connect: [{ id: users.felix.id }, { id: users.isak.id }, { id: users.robert.id }],
      },
    },
  });

  const mkb2 = await prisma.group.create({
    data: {
      name: "MKB2",
      type: GroupType.OTHER,
      description: "2Basar i MK",
      parents: { connect: [{ id: mk.id }, { id: b2.id }] },
    },
  });

  const styret = await prisma.group.create({
    data: {
      name: "Styret",
      type: GroupType.BOARD,
      description: "Körens styrelse",
    },
  });

  const conductors = await prisma.group.create({
    data: {
      name: "Dirigenter",
      type: GroupType.CONDUCTORS,
      description: "Körens dirigenter",
    },
  });

  const gigmasters = await prisma.group.create({
    data: {
      name: "Gigmästeriet",
      type: GroupType.COMMITTEE,
      description: "Körens gigmästeri",
    },
  });

  const partycommittee = await prisma.group.create({
    data: {
      name: "Sexmästeriet",
      type: GroupType.COMMITTEE,
      description: "Körens sexmästeri",
    },
  });

  const concertmasters = await prisma.group.create({
    data: {
      name: "Konsertmästeriet",
      type: GroupType.COMMITTEE,
      description: "Körens konsertmästeri",
    },
  });

  const webmasters = await prisma.group.create({
    data: {
      name: "Webbmästeriet",
      type: GroupType.COMMITTEE,
      description: "Körens webbmästeri",
      members: { connect: [{ id: users.liam.id }, { id: users.lucas.id }] },
    },
  });

  const recruiters = await prisma.group.create({
    data: {
      name: "Rekryteringskommitén",
      type: GroupType.COMMITTEE,
      description: "Körens rekryteringskommitté",
    },
  });

  const utantillkommitten = await prisma.group.create({
    data: {
      name: "Utantillkommittén",
      type: GroupType.COMMITTEE,
      description: "Körens utantillkommitté",
    },
  });

  const sheetfishes = await prisma.group.create({
    data: {
      name: "Notfiskalerna",
      type: GroupType.OTHER,
      description: "Körens notfiskargrupp",
    },
  });

  const admins = await prisma.group.create({
    data: {
      name: "Admins",
      type: GroupType.OTHER,
      description: "Administratörer av systemet",
      members: { connect: [{ id: users.lucas.id }, { id: users.liam.id }] },
    },
  });

  return {
    csk,
    mk,
    kk,
    dk,
    sa,
    tb,
    s,
    s1,
    s2,
    a,
    a1,
    a2,
    t,
    t1,
    t2,
    b,
    b1,
    b2,
    kks,
    kks1,
    kks2,
    kka,
    kka1,
    kka2,
    kkt,
    kkt1,
    kkt2,
    kkb,
    kkb1,
    kkb2,
    dks1,
    dks2,
    dka1,
    dka2,
    mkt1,
    mkt2,
    mkb1,
    mkb2,
    styret,
    conductors,
    gigmasters,
    partycommittee,
    concertmasters,
    webmasters,
    recruiters,
    utantillkommitten,
    sheetfishes,
    admins,
  };
}

export interface Groups {
  csk: { id: number };
  mk: { id: number };
  kk: { id: number };
  dk: { id: number };
  sa: { id: number };
  tb: { id: number };
  s: { id: number };
  s1: { id: number };
  s2: { id: number };
  a: { id: number };
  a1: { id: number };
  a2: { id: number };
  t: { id: number };
  t1: { id: number };
  t2: { id: number };
  b: { id: number };
  b1: { id: number };
  b2: { id: number };
  kks: { id: number };
  kks1: { id: number };
  kks2: { id: number };
  kka: { id: number };
  kka1: { id: number };
  kka2: { id: number };
  kkt: { id: number };
  kkt1: { id: number };
  kkt2: { id: number };
  kkb: { id: number };
  kkb1: { id: number };
  kkb2: { id: number };
  dks1: { id: number };
  dks2: { id: number };
  dka1: { id: number };
  dka2: { id: number };
  mkt1: { id: number };
  mkt2: { id: number };
  mkb1: { id: number };
  mkb2: { id: number };
  styret: { id: number };
  conductors: { id: number };
  gigmasters: { id: number };
  partycommittee: { id: number };
  concertmasters: { id: number };
  webmasters: { id: number };
  recruiters: { id: number };
  utantillkommitten: { id: number };
  sheetfishes: { id: number };
  admins: { id: number };
}
