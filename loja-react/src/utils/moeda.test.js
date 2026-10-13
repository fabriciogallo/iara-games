import { describe, expect, it } from "vitest";
import { arredondar, formatarMoeda, formatarPreco } from "./moeda";

// O toLocaleString usa um espaço "duro" entre o R$ e o número: troca por espaço comum pra comparar
const normal = (texto) => texto.replace(/\s/g, " ");

describe("moeda", () => {
  it("formata em reais", () => {
    expect(normal(formatarMoeda(65))).toBe("R$ 65,00");
    expect(normal(formatarMoeda(1234.5))).toBe("R$ 1.234,50");
  });

  it("jogo de R$ 0 aparece como Gratuito (também quando o preço vem como texto)", () => {
    expect(formatarPreco(0)).toBe("Gratuito");
    expect(formatarPreco("0")).toBe("Gratuito");
    expect(normal(formatarPreco(46.99))).toBe("R$ 46,99");
  });

  it("arredonda em centavos, sem a sobra de ponto flutuante", () => {
    expect(arredondar(0.1 + 0.2)).toBe(0.3);
    expect(arredondar(46.99 * 0.1)).toBe(4.7);
    expect(arredondar(10)).toBe(10);
  });
});
