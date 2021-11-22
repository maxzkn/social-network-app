import React from "react";
import { create } from "react-test-renderer";
import Paginator from "./Paginator";

describe("Paginator component", () => {
    test("pages count is 11 but only 10 should be showed", () => {
        let component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} />)
        const instance = component.root;
        let spans = instance.findAllByType("span");
        expect(spans.length).toBe(10);
    });

    test("if pages count is more than 10 then button NEXT should be showed", () => {
        let component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} />)
        const instance = component.root;
        let button = instance.findAllByType("button");
        expect(button.length).toBe(1);
    });
})
