import { NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({
		publicKey: process.env.VAPID_PUBLIC_KEY,
	});
};
