"use client";

import { ModalContext } from "@/app/providers";
import { useContext } from "react";
import ImageLarge from "./ImageLarge";
import Indexer from "./Indexer";
import Notification from "./Notification";
import SuccessCheckout from "./SuccessCheckout";
import Who from "./Who";
import Signless from "./Signless";
import CrearCuenta from "./CrearCuenta";

export default function ModalsEntry({ dict }: { dict: any }) {
  const context = useContext(ModalContext);
  return (
    <>
      {context?.reactBox && <Who dict={dict} />}
      {context?.successCheckout && <SuccessCheckout dict={dict} />}
      {context?.createAccount && <CrearCuenta dict={dict} />}
      {context?.signless && <Signless dict={dict} />}
      {context?.notification && <Notification />}
      {context?.indexar && <Indexer />}
      {context?.imageViewer && <ImageLarge />}
    </>
  );
}
