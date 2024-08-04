import { RefObject, useEffect } from "react";

type TCloseOnClickOutside = (
    containerRef: RefObject<HTMLElement | null>,
    isOpenSetter: React.Dispatch<React.SetStateAction<boolean>>,
) => void;

export const useCloseOnClickOutside: TCloseOnClickOutside = (
    containerRef,
    isOpenSetter,
): void => {
    useEffect(() => {
        if (!containerRef.current) return;
        function closeOnClickOutside(e: MouseEvent): void {
            const clickedElement = e.target as HTMLElement;
            if (!containerRef.current?.contains(clickedElement)) {
                isOpenSetter(() => false);
            }
        }

        document.addEventListener("click", closeOnClickOutside);
        return () => document.removeEventListener("click", closeOnClickOutside);
    }, [containerRef]);
};
