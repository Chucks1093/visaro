/// <reference types="vite/client" />
import { ExternalProvider } from "@ethersproject/providers";

interface ImportMetaEnv {
   readonly VITE_BASE_URL: string;
}

interface ImportMeta {
   readonly env: ImportMetaEnv
}


interface Window {
   ethereum: any;
 }