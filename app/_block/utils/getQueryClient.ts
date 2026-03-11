import { cache } from "react";
import { makeQueryClient } from "@/app/_block/utils/makeQueryClient";

export const getQueryClient = cache(makeQueryClient);
