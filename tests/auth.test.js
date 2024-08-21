const request = require('supertest')
const bcrypt = require('bcryptjs')

const app = require('../config/appConfig.js') // Assuming your Express app is exported from app.js
const db = require('../config/db.js')

describe('Auth Controller', () => {
	beforeAll(async () => {
		jest.clearAllMocks()
	})

	describe('login', () => {
		it('returns 200 and a token for valid credentials', async () => {
			const user = { username: 'testuser', password: 'password123' }
			const hashedPassword = await bcrypt.hash(user.password, 10)

			db.user.findOne = jest.fn().mockResolvedValue(
				db.user.build({
					id: 1,
					username: user.username,
					password: hashedPassword,
				})
			)

			const response = await request(app).post('/auth/login').send(user)

			expect(response.status).toBe(200)
			expect(response.body).toHaveProperty('token')
		})

		it('returns 400 for non-existent user', async () => {
			const user = { username: 'nonexistent', password: 'password123' }

			db.user.findOne = jest.fn().mockResolvedValue(null)

			const response = await request(app).post('/auth/login').send(user)

			expect(response.status).toBe(400)
			expect(response.body.message).toBe('User not found')
		})

		it('returns 400 for invalid password', async () => {
			const user = { username: 'testuser', password: 'password123' }
			const hashedPassword = await bcrypt.hash(user.password, 10)

			db.user.findOne = jest.fn().mockResolvedValue(
				db.user.build({
					id: 1,
					username: user.username,
					password: hashedPassword,
				})
			)

			const response = await request(app)
				.post('/auth/login')
				.send({ username: user.username, password: 'wrongpassword' })

			expect(response.status).toBe(400)
			expect(response.body.message).toBe('Invalid password')
		})
	})

	describe('register', () => {
		it('returns 201 and a token for valid registration', async () => {
			const user = { username: 'newuser', password: 'password123' }
			const hashedPassword = await bcrypt.hash(user.password, 10)

			db.user.findOne = jest.fn().mockResolvedValue(null)
			db.user.create = jest.fn().mockResolvedValue(
				db.user.build({
					id: 1,
					username: user.username,
					password: hashedPassword,
				})
			)

			const response = await request(app)
				.post('/auth/register')
				.send(user)

			expect(response.status).toBe(201)
			expect(response.body).toHaveProperty('token')
		})

		it('returns 400 for short password', async () => {
			const user = { username: 'newuser', password: 'short' }

			const response = await request(app)
				.post('/auth/register')
				.send(user)

			expect(response.status).toBe(400)
			expect(response.body.message).toBe(
				'Password must be at least 8 characters long'
			)
		})

		it('returns 400 for existing user', async () => {
			const user = { username: 'existinguser', password: 'password123' }
			const hashedPassword = await bcrypt.hash(user.password, 10)

			db.user.findOne = jest.fn().mockResolvedValue(
				db.user.build({
					id: 1,
					username: user.username,
					password: hashedPassword,
				})
			)

			const response = await request(app)
				.post('/auth/register')
				.send(user)

			expect(response.status).toBe(400)
			expect(response.body.message).toBe('User already exists')
		})
	})
})
