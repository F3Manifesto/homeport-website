import { UseTraitsResult } from "../../../types/general.types";

const useTraits = (): UseTraitsResult => {
  const traits: string[] = [
    " NUMBER INCLUDED",
    "KEYS TO UNLOCK",
    "SIZE(S) AVAILABLE",
    "MATERIAL",
    "COLOR VARIATIONS",
    "FORMAT VARIATIONS",
    "PART OF A SERIES",
    "SYNTH MODEL USED",
    "NUMBER OF PROPS",
    "CUSTOM EMBEDDINGS",
    "SAMPLING METHOD(S)",
    "SOURCE INCLUDED",
  ];

  const values: string[] = [
    "1 PIECE(S)",
    "13",
    '24" x 36"',
    "MATTE PAINT",
    "NO",
    "YES",
    "YES",
    "SD 1.5, LUCID_OSCILLATORS",
    "23",
    "YES",
    "EULER_A",
    "YES",
  ];

  return { traits, values };
};

export default useTraits;
