import "@testing-library/jest-dom";

jest.mock("axios", () => {
	return {
		create: jest.fn().mockReturnValue({
			interceptors: {
				request: { use: jest.fn(), eject: jest.fn() },
				response: { use: jest.fn(), eject: jest.fn() }
			}
		}),
		get: jest.fn(),
		post: jest.fn()
	};
});
