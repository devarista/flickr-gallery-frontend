const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: '.' })

const customJestConfig = {
    testEnvironment: 'jsdom',
    clearMocks: true,
    moduleDirectories: ['node_modules', 'pages', 'components'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}

module.exports = createJestConfig(customJestConfig)
