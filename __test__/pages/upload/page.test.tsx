import React from "react";
import "@testing-library/jest-dom"
import { describe, it } from "node:test";
import Upload from "../../../src/app/(authentication)/login/page"
import { fireEvent, render, screen } from "@testing-library/react";
describe("Testing first page",()=>{
    it("it shoeud render prieprly",()=>{
render(<Upload/>)

expect(screen.getByText('Login')).toBeInTheDocument();


})
})