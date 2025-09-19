import { ErrorCode } from "@/errors/ErrorMessages";
import { GeneralMessages } from "@/errors/GeneralMessages";

export type MessageType = Record<ErrorCode | GeneralMessages, string>;