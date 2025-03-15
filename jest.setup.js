import "@testing-library/jest-dom";
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.doMock();
})