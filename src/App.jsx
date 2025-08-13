import React, { useMemo, useState } from "react";

// --- Demo data --------------------------------------------------------------
// NOTE: These size charts are simplified and approximate for prototype use only.
// Replace with verified brand data before production.
const SIZE_CHARTS = {
  Nike: {
    Tops: {
      Men: [
        { label: "XS", chest: [81, 86], waist: [66, 73], hips: [80, 86] },
        { label: "S", chest: [86, 94], waist: [73, 81], hips: [86, 94] },
        { label: "M", chest: [94, 102], waist: [81, 89], hips: [94, 102] },
        { label: "L", chest: [102, 110], waist: [89, 97], hips: [102, 110] },
        { label: "XL", chest: [110, 118], waist: [97, 109], hips: [110, 118] },
        { label: "XXL", chest: [118, 128], waist: [109, 121], hips: [118, 128] },
      ],
      Women: [
        { label: "XS", chest: [76, 83], waist: [60, 67], hips: [84, 90] },
        { label: "S", chest: [83, 90], waist: [67, 74], hips: [90, 96] },
        { label: "M", chest: [90, 97], waist: [74, 81], hips: [96, 103] },
        { label: "L", chest: [97, 104], waist: [81, 88], hips: [103, 110] },
        { label: "XL", chest: [104, 114], waist: [88, 98], hips: [110, 118] },
      ],
    },
    Bottoms: {
      Men: [
        { label: "28", waist: [70, 73], hips: [85, 88], inseam: [76, 82] },
        { label: "30", waist: [74, 78], hips: [89, 92], inseam: [76, 84] },
        { label: "32", waist: [79, 83], hips: [93, 96], inseam: [76, 86] },
        { label: "34", waist: [84, 88], hips: [97, 100], inseam: [76, 86] },
        { label: "36", waist: [89, 94], hips: [101, 104], inseam: [76, 86] },
      ],
      Women: [
        { label: "0-2", waist: [60, 67], hips: [84, 90], inseam: [74, 82] },
        { label: "4-6", waist: [67, 74], hips: [90, 96], inseam: [74, 84] },
        { label: "8-10", waist: [74, 81], hips: [96, 103], inseam: [74, 86] },
        { label: "12-14", waist: [81, 88], hips: [103, 110], inseam: [74, 86] },
      ],
    },
  },
  Adidas: {
    Tops: {
      Men: [
        { label: "XS", chest: [82, 87], waist: [69, 75], hips: [82, 87] },
        { label: "S", chest: [88, 94], waist: [76, 82], hips: [88, 94] },
        { label: "M", chest: [95, 102], waist: [83, 90], hips: [95, 102] },
        { label: "L", chest: [103, 111], waist: [91, 99], hips: [103, 111] },
        { label: "XL", chest: [112, 121], waist: [100, 109], hips: [112, 120] },
      ],
      Women: [
        { label: "XS", chest: [77, 82], waist: [61, 66], hips: [84, 89] },
        { label: "S", chest: [83, 88], waist: [67, 72], hips: [90, 95] },
        { label: "M", chest: [89, 94], waist: [73, 78], hips: [96, 101] },
        { label: "L", chest: [95, 101], waist: [79, 85], hips: [102, 108] },
        { label: "XL", chest: [102, 109], waist: [86, 94], hips: [109, 116] },
      ],
    },
    Bottoms: {
      Men: [
        { label: "S (30)", waist: [74, 80], hips: [88, 94], inseam: [76, 84] },
        { label: "M (32)", waist: [81, 86], hips: [95, 101], inseam: [76, 86] },
        { label: "L (34)", waist: [87, 93], hips: [102, 108], inseam: [76, 86] },
        { label: "XL (36)", waist: [94, 101], hips: [109, 115], inseam: [76, 86] },
      ],
      Women: [
        { label: "XS (0-2)", waist: [61, 67], hips: [84, 90], inseam: [74, 82] },
        { label: "S (4-6)", waist: [67, 73], hips: [90, 96], inseam: [74, 84] },
        { label: "M (8-10)", waist: [73, 79], hips: [96, 102], inseam: [74, 86] },
        { label: "L (12-14)", waist: [79, 85], hips: [102, 108], inseam: [74, 86] },
      ],
    },
  },
  Uniqlo: {
    Tops: {
      Men: [
        { label: "XS", chest: [80, 86], waist: [68, 74], hips: [82, 88] },
        { label: "S", chest: [86, 92], waist: [74, 80], hips: [88, 94] },
        { label: "M", chest: [92, 98], waist: [80, 86], hips: [94, 100] },
        { label: "L", chest: [98, 104], waist: [86, 92], hips: [100, 106] },
        { label: "XL", chest: [104, 110], waist: [92, 98], hips: [106, 112] },
      ],
      Women: [
        { label: "XS", chest: [74, 80], waist: [58, 64], hips: [82, 88] },
        { label: "S", chest: [80, 86], waist: [64, 70], hips: [88, 94] },
        { label: "M", chest: [86, 92], waist: [70, 76], hips: [94, 100] },
        { label: "L", chest: [92, 98], waist: [76, 82], hips: [100, 106] },
        { label: "XL", chest: [98, 104], waist: [82, 88], hips: [106, 112] },
      ],
    },
    Bottoms: {
      Men: [
        { label: "28", waist: [70, 73], hips: [86, 90], inseam: [74, 84] },
        { label: "30", waist: [74, 78], hips: [90, 94], inseam: [74, 86] },
        { label: "32", waist: [79, 83], hips: [95, 99], inseam: [74, 86] },
        { label: "34", waist: [84, 88], hips: [100, 104], inseam: [74, 86] },
      ],
      Women: [
        { label: "23-24", waist: [57, 60], hips: [82, 86], inseam: [72, 80] },
        { label: "25-26", waist: [61, 64], hips: [86, 90], inseam: [72, 82] },
        { label: "27-28", waist: [65, 70], hips: [90, 95], inseam: [72, 84] },
        { label: "29-30", waist: [71, 76], hips: [95, 100], inseam: [72, 86] },
      ],
    },
  },
};

const ALL_BRANDS = Object.keys(SIZE_CHARTS);
const CATEGORIES = ["Tops", "Bottoms"];
const GENDERS = ["Men", "Women"];

// --- Helpers ----------------------------------------------------------------
const cmToIn = (cm) => cm / 2.54;
const inToCm = (inch) => inch * 2.54;
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const within = ([lo, hi], val, pad = 0) => val >= (lo - pad) && val <= (hi + pad);

function scoreSize(sizeRow, meas, category) {
  const pad = 1.5; // cm tolerance
  const keys = category === "Tops" ? ["chest", "waist", "hips"] : ["waist", "hips", "inseam"];
  let score = 0, used = 0;
  for (const k of keys) {
    if (!sizeRow[k] || !meas[k]) continue;
    used++;
    if (within(sizeRow[k], meas[k], pad)) score += 2;
    else if (meas[k] < sizeRow[k][0]) score += 1 - (sizeRow[k][0] - meas[k]) / 10;
    else score += 1 - (meas[k] - sizeRow[k][1]) / 10;
  }
  return used ? score / used : -Infinity;
}

function pickSize(chart, meas, category) {
  if (!Array.isArray(chart) || chart.length === 0) return null;
  let best = null, bestScore = -Infinity;
  for (const row of chart) {
    const s = scoreSize(row, meas, category);
    if (s > bestScore) { best = row; bestScore = s; }
  }
  return best;
}

function prettyRange([lo, hi], unit) {
  const f = unit === "in" ? cmToIn : (x) => x;
  const a = Math.round(f(lo) * 10) / 10;
  const b = Math.round(f(hi) * 10) / 10;
  return `${a}–${b} ${unit}`;
}

// --- UI ---------------------------------------------------------------------
export default function App() {
  const [unit, setUnit] = useState("cm");
  const [category, setCategory] = useState("Tops");
  const [gender, setGender] = useState("Men");
  const [brands, setBrands] = useState(ALL_BRANDS);
  const [meas, setMeas] = useState({ chest: 100, waist: 84, hips: 100, inseam: 80, height: 178 });

  const measCm = useMemo(() => {
    if (unit === "cm") return meas;
    return {
      chest: inToCm(meas.chest ?? 0),
      waist: inToCm(meas.waist ?? 0),
      hips: inToCm(meas.hips ?? 0),
      inseam: inToCm(meas.inseam ?? 0),
      height: inToCm(meas.height ?? 0),
    };
  }, [meas, unit]);

  const results = useMemo(() => {
    const out = {};
    for (const brand of brands) {
      const b = SIZE_CHARTS[brand]?.[category]?.[gender];
      const pick = pickSize(b, measCm, category);
      if (pick) out[brand] = pick;
    }
    return out;
  }, [brands, category, gender, measCm]);

  const unitLabel = unit === "cm" ? "cm" : "in";
  function handleNumChange(key, valueStr) {
    let v = parseFloat(valueStr);
    if (Number.isNaN(v)) v = 0;
    v = clamp(v, 0, 400);
    setMeas((m) => ({ ...m, [key]: v }));
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
            <h1 className="text-2xl font-semibold">Size Me</h1>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="mr-1">Units</span>
            <div className="inline-flex rounded-xl border overflow-hidden">
              <button
                className={`px-3 py-1 ${unit === "cm" ? "bg-slate-900 text-white" : "bg-white"}`}
                onClick={() => setUnit("cm")}
              >cm</button>
              <button
                className={`px-3 py-1 ${uni
