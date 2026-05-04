import { SearchIcon } from "./AdminIcons";

function EntitySearchBar({ value, onChange, onClear, placeholder, clearLabel }) {
  return (
    <label className="flex h-[42px] w-full items-center rounded-full border border-slate-300 bg-white px-4 text-slate-400 shadow-[0_1px_2px_rgba(15,23,42,0.04)] xl:w-[700px] xl:flex-none">
      <SearchIcon className="h-5 w-5 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-3 text-[15px] text-slate-600 placeholder:text-slate-400 focus:outline-none"
      />
      <button
        type="button"
        onClick={onClear}
        className={[
          "text-[18px] leading-none text-slate-400 transition hover:text-slate-600",
          value ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-label={clearLabel}
      >
        X
      </button>
    </label>
  );
}

export default EntitySearchBar;