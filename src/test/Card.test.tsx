import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardContext } from "../context/cardContext";
import Card from "../components/Card";

describe("My component Card", () => {
  const mockProps = {
    logo: "test-logo.png",
    company: "Test Company",
    position: "Frontend Developer",
    role: "Frontend",
    level: "Senior",
    postedAt: "2d ago",
    contract: "Full Time",
    location: "Remote",
    languages: ["JavaScript", "TypeScript"],
    tools: ["React", "Vitest"],
  };

  const mockAddFilter = vi.fn();

  vi.mock("react", async () => {
    const actual = await vi.importActual("react");
    return {
      ...actual,
      useContext: vi.fn(() => ({ addFilter: vi.fn() })),
    };
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("el componente se renderiza correctamente con las props dadas", () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText(mockProps.company)).toBeInTheDocument();
    expect(screen.getByText(mockProps.position)).toBeInTheDocument();
    expect(screen.getByText(mockProps.role)).toBeInTheDocument();
    expect(screen.getByText(mockProps.level)).toBeInTheDocument();
    expect(screen.getByText(mockProps.postedAt)).toBeInTheDocument();
    expect(screen.getByText(mockProps.contract)).toBeInTheDocument();
    expect(screen.getByText(mockProps.location)).toBeInTheDocument();
  });

  it("mostrar badge FEATURED SI es true", () => {
    render(<Card {...mockProps} featured={true} />);

    expect(screen.getByText("FEATURED")).toBeInTheDocument();
  });

  it("mostrar badge NEW! SI es true", () => {
    render(<Card {...mockProps} new={true} />);

    expect(screen.getByText("NEW!")).toBeInTheDocument();
  });

  it("no mostrar badge NEW! o FEATURED SI son de tipo false", () => {
    render(<Card {...mockProps} new={false} featured={false} />);

    expect(screen.queryByText("NEW!")).not.toBeInTheDocument();
    expect(screen.queryByText("FEATURED")).not.toBeInTheDocument();
  });

  it("llamar a la función addFilter cuando se hace click en el botón 'role'", () => {
    render(
      <CardContext.Provider value={{ addFilter: mockAddFilter }}>
        <Card {...mockProps} languages={["JavaScript", "TypeScript"]}/>
      </CardContext.Provider>
    );

    const languageButton  = screen.getByText("JavaScript");
    languageButton.click();
    console.log("holis este es el bug:")
    console.log(screen.debug());
  });

  it("aplicar border SI featured y new son true", () => {
    const { container } = render(
      <Card {...mockProps} featured={true} new={true} />
    );

    const cardElement = container.firstChild as HTMLDivElement;
    expect(cardElement).toHaveClass("border-solid border-l-5 borderPrimary");
  });

  it("renderizado de todos los languajes y tools props", () => {
    render(<Card {...mockProps} />);

    mockProps.languages?.forEach((lang) => {
      expect(screen.getByText(lang)).toBeInTheDocument();
    });

    mockProps.tools?.forEach((tool) => {
      expect(screen.getByText(tool)).toBeInTheDocument();
    });
  });
});
