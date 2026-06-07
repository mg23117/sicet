import { clsx } from "clsx";
import type { Equipment } from '../types/Equipment';
import { useTranslation } from "react-i18next";

interface MapFiltersProps {
    branchFilter: string | "";
    onBranchFilterChange: (value: string) => void;
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    equipments: Equipment[];
    branches: string[];
    hoveredEquipmentId: string | null;
    onHoverEquipment: (id: string | null) => void;
    onSelectEquipment: (equipment: Equipment) => void;
}

export default function MapFilters({
    branchFilter,
    onBranchFilterChange,
    searchTerm,
    onSearchTermChange,
    equipments,
    branches,
    hoveredEquipmentId,
    onHoverEquipment,
    onSelectEquipment,
}: MapFiltersProps) {
    const { t } = useTranslation("geopanel");
    return (
        <aside className="w-[360px] bg-bodyBgSeg border-l border-white/5 rounded-l-[28px] shadow-2xl flex flex-col overflow-hidden">
            <div className="px-5 pt-5 pb-4 border-b border-white/5">
                <h2 className="text-lg font-semibold text-bodyTxtMain tracking-wide">
                    {t("titlePanel")}
                </h2>

                <div className="px-2 py-1 border-b border-[#3A4045]" />

                <div>
                    <label className="block py-2 text-sm font-medium text-bodyTxtThird mb-2">{t("lookEq")}</label>
                    <input
                        className="block w-full rounded-xl border border-white/10 bg-bodyBgMain text-bodyTxtMain px-3 py-2.5 shadow-sm outline-none placeholder:text-bodyTxtThird transition focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]"
                        type="text"
                        placeholder="Ej: MacBook Air (or its serial number)"
                        value={searchTerm}
                        onChange={(e) => onSearchTermChange(e.target.value)}
                    />
                </div>

                <div className="px-2 py-1 border-b border-[#3A4045]" />

                <div className="mt-5 space-y-4 text-bodyTxtMain">
                    {t("filter")}
                    <div>
                        <label htmlFor="branch-select" className="block py-2 text-sm font-medium text-bodyTxtThird">{t("branch")}</label>
                        <select
                            id = "branch-select"
                            className="block w-full rounded-xl border border-white/10 bg-bodyBgMain text-bodyTxtMain px-3 py-2.5 shadow-sm outline-none transition focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]"
                            value={branchFilter}
                            onChange={(e) => onBranchFilterChange(e.target.value)}
                        >
                            <option value={""} disabled>{t("msgBranch")}</option>
                            {branches.map((b) => {
                                return (
                                    <option
                                        key={b}
                                        value={b}
                                    >
                                        {b}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex-1 px-5 py-4 overflow-y-auto">
                <h3 className="text-sm font-semibold text-bodyTxtMain uppercase tracking-wide mb-4">
                    {t("resultLook")}
                    <span className="text-bodyTxtThird ml-1">({equipments.length})</span>
                </h3>

                <div className="space-y-1">
                    {equipments.map((e) => (
                        <div
                            key={e.id}
                            className={clsx(
                                "px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent",
                                {
                                    "bg-bodyBgMain border-[#00E5FF]/50 shadow-[0_0_0_1px_rgba(0,229,255,0.22),0_10px_24px_rgba(0,0,0,0.35)] translate-x-1":
                                        hoveredEquipmentId === e.id,
                                    "hover:bg-white/8 hover:border-[#00E5FF]/20 hover:shadow-[0_0_0_1px_rgba(0,229,255,0.08)]":
                                        hoveredEquipmentId !== e.id,
                                }
                            )}
                            onMouseEnter={() => onHoverEquipment(e.id)}
                            onMouseLeave={() => onHoverEquipment(null)}
                            onClick={() => onSelectEquipment(e)}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <p className="font-medium text-bodyTxtMain text-sm truncate">
                                    {e.name}
                                </p>
                            </div>

                            <p className="text-xs text-bodyTxtThird mt-1">
                                {e.branch} - {e.status}
                            </p>
                            <div className="px-2 py-1 border-b border-[#3A4045]" />
                        </div>
                    ))}

                    {equipments.length === 0 && (
                        <div className="px-3 py-4 text-sm text-bodyTxtThird">
                            {t("msgResult")}
                        </div>
                    )}
                </div>
            </div>
        </aside >
    );
}