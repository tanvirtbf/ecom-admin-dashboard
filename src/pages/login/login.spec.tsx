import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react'
import LoginPage from './login';

describe("Login Page", () => {
    it("should login page", async () => {
        render(<LoginPage />)

        // getBy -- throws an error
        // findBy -- user for async operation
        // queryBy -- if expected value not find then return null (similar with getBy but getBy returns or throws error but queryBy return null) 

        expect(screen.getByText("Sign in")).toBeInTheDocument()
    })
})