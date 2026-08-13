import type { ChangeEvent } from "react";

type ToggleProps = {
	label: string;
	checked?: boolean;
	disabled?: boolean;
	onChange: (checked: boolean) => void;
};
export const Toggle = ({ label, checked, disabled, onChange }: ToggleProps) => {
	const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		onChange(target.checked);
	};

	return (
		<label className="inline-flex cursor-pointer items-center has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60">
			<input
				type="checkbox"
				checked={checked}
				disabled={disabled}
				className="sr-only peer"
				onChange={handleOnChange}
			/>
			<span className="relative h-6 w-11 rounded-full bg-gray-300 transition-colors after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:content-[''] peer-checked:bg-gray-900 peer-checked:after:translate-x-5 peer-focus-visible:ring-4 peer-focus-visible:ring-gray-300" />
			<span className="ms-3 select-none text-sm font-medium text-gray-800">
				{label}
			</span>
		</label>
	);
};
