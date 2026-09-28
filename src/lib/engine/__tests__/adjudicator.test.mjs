import test from "node:test";
import assert from "node:assert/strict";
import { normalizeEntity, adjudicateDuel } from "../mock-adjudicator.ts";

test("normalizeEntity correctly parses raw inputs", () => {
  const onion = normalizeEntity("an onion");
  assert.equal(onion.canonicalName, "ONION SANDWICH");
  assert.equal(onion.category, "Mundane");
  assert.equal(onion.scaleTier, 6);

  const bomb = normalizeEntity("a nuclear bomb");
  assert.equal(bomb.canonicalName, "NUCLEAR BOMB SANDWICH");
  assert.equal(bomb.category, "Weapon");
  assert.equal(bomb.scaleTier, 82);

  const blackHole = normalizeEntity("supermassive black hole");
  assert.equal(blackHole.category, "Cosmic");
  assert.equal(blackHole.scaleTier, 95);
});

test("adjudicateDuel correctly resolves scale advantages", () => {
  const onion = normalizeEntity("onion");
  const bomb = normalizeEntity("nuclear bomb");

  const verdict = adjudicateDuel(onion, bomb);
  assert.equal(verdict.winner, "challenger");
  assert.equal(verdict.dominantFactor, "destruction");
});

test("adjudicateDuel evaluates elemental counter (water vs nuclear)", () => {
  const bomb = normalizeEntity("nuclear bomb");
  const water = normalizeEntity("water balloon");

  const verdict = adjudicateDuel(bomb, water);
  assert.equal(verdict.winner, "challenger");
  assert.equal(verdict.dominantFactor, "elemental_counter");
});

test("adjudicateDuel defends champion against inferior challenger", () => {
  const bomb = normalizeEntity("nuclear bomb");
  const ant = normalizeEntity("ant");

  const verdict = adjudicateDuel(bomb, ant);
  assert.equal(verdict.winner, "champion");
  assert.equal(verdict.dominantFactor, "scale");
});
