import { useEffect, useState } from "react";
import { type Branch } from "../types/Branch";

export function useBranches() {
    const [branches, setBranches] = useState<Branch[]>([]);

    useEffect(() => {
        const loadBranches = async () => {
            try {
                const response = await fetch('/data/branches.json');
                const data: Branch[] = await response.json();
                setBranches(data);
            } catch (e) {
                console.error('Error loading branches: ', e);
            }
        };

        loadBranches();
    }, []);

    return branches;
}