import React from "react";
import { create, act } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be the value of input", () => {
        let component;
        // act(() => {
            component = create(<ProfileStatus userStatus={"it-kamasutra.com"} />)
        // });
        const instance = component.root;
        expect(instance.props.userStatus).toBe("it-kamasutra.com");
    });

    test("should render <span> after creation", () => {
        let component;
        // act(() => {
            component = create(<ProfileStatus />)
        // });
        const instance = component.root;
        const span = instance.findByType("span");
        expect(span).not.toBeNull();
    });

    test("should not render <input> after creation", () => {
        let component;
        // act(() => {
            component = create(<ProfileStatus />)
        // });
        const instance = component.root;
        expect(() => {
            instance.findByType("input");
        }).toThrow();
    });

    test("<span> should have correct status", () => {
        let component;
        // act(() => {
            component = create(<ProfileStatus userStatus={"it-kamasutra.com"} />)
        // });
        const instance = component.root;
        const span = instance.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra.com");
    });

    test("should render <input> instead of <span> if isEditMode is true", () => {
        let component;
        // act(() => {
            component = create(<ProfileStatus userStatus={"it-kamasutra.com"} />)
        // });
        const instance = component.root;
        const span = instance.findByType("span");
        act(() => {
            span.props.onDoubleClick();
        })
        const input = instance.findByType("input");
        expect(input.props.value).toBe("it-kamasutra.com");
        expect(() => {
            instance.findByType("span");
        }).toThrow();
    });

    test("should call callback", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus userStatus={"it-kamasutra.com"} updateUserStatus={mockCallback} />);
        const instance = component.root;
        const span = instance.findByType("span");
        act(() => {
            span.props.onDoubleClick();
        })
        const input = instance.findByType("input");
        act(() => {
            input.props.onBlur();
        })
        expect(mockCallback.mock.calls.length).toBe(1);
    });
})
