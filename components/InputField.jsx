export default function InputField({ label, value, setValue, type }) {
    return (
        <div className="bg-green-700">
            <div>{label}</div>
            <input
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
