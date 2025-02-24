import jwt_decode from "jwt-decode";

const isExpiredToken = (token: string): boolean => {
	const tokenDecode: any = jwt_decode(token);
	if (!tokenDecode?.exp) return true;
	const tokenDateTime = new Date(tokenDecode.exp * 1000);
	const ct = new Date();
	const compareTime = new Date(ct.setMinutes(ct.getMinutes() + 5));

	if (compareTime > tokenDateTime) return true;
	return false;
};

export { isExpiredToken };
