export default function AccountField({ label, name, value, isEdit, onChange }) {
  return (
    <div className="d-flex align-items-center gap-2 justify-content-between mb-3">
      <label htmlFor={name} className="form-label">
        {label}:
      </label>
      <input
        type="text"
        className="form-control w-75"
        id={name}
        name={name}
        value={value ?? ""}
        readOnly={!isEdit}
        onChange={isEdit ? onChange : undefined}
      />
    </div>
  );
}
