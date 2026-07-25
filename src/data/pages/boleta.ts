/**
 * "Conozca su Boleta". Fiel a la página original (ssrlarmahue.cl/boleta.php):
 * boleta de ejemplo anotada. Textos de descripción EXACTOS al original.
 */
export const billData = {
  intro:
    "Tu boleta detalla el consumo de agua potable del período. Aquí te explicamos cada parte.",
  parts: [
    {
      id: "datos-cliente",
      title: "Datos del Cliente",
      description:
        "Identificación personal del cliente. Estos datos pueden ser actualizados en caso de cambios.",
    },
    {
      id: "numero-contrato",
      title: "Número de Contrato",
      description: "Este número identifica su arranque, téngalo siempre a mano.",
    },
    {
      id: "detalle-suministro",
      title: "Detalle del Suministro",
      description:
        "Información importante del arranque: dirección, número de medidor, tipo de tarifa, diámetro, etc.",
    },
    {
      id: "detalle-consumo",
      title: "Detalle del Consumo",
      description:
        "Detalle de su consumo en M3, indica fecha de lectura actual y anterior y m3 subsidiados, cuando corresponda.",
    },
    {
      id: "detalle-cuenta",
      title: "Detalle de su Cuenta",
      description: "Detalle de los cobros o descuentos del mes:",
      items: [
        { term: "TOTAL FACTURABLE", desc: "Ítems que inciden en los ingresos del Comité." },
        {
          term: "TOTAL NO FACTURABLE",
          desc: "Ítems que repercuten en las cuentas de Activo y Pasivo del Comité.",
        },
        {
          term: "TOTAL DEL PERÍODO",
          desc: "Valor mensual de la boleta (total facturable más total no facturable).",
        },
        {
          term: "TOTAL A PAGAR",
          desc: "Valor total de la boleta (total del período más saldo anterior).",
        },
      ],
    },
    {
      id: "consumo-13",
      title: "Consumo últimos 13 meses",
      description:
        "Gráfico de su consumo los últimos 13 meses. Puede identificar los períodos de mayor consumo y compararlos con el año anterior o detectar alzas bruscas de consumo.",
    },
    {
      id: "totales",
      title: "Totales",
      description: "Indica el Total a Pagar y la fecha de vencimiento de la boleta.",
    },
    {
      id: "mensaje",
      title: "Mensaje",
      description: "Información importante que el Comité desea comunicarle. Léala siempre.",
    },
  ],
} as const;
