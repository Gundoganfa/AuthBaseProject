import { GET } from '@/app/api/public/route'

describe('/api/public', () => {
  describe('GET', () => {
    it('returns public message', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({
        message: 'This is a public API endpoint',
        status: 'success',
        timestamp: expect.any(String)
      })
    })

    it('returns valid timestamp', async () => {
      const response = await GET()
      const data = await response.json()

      const timestamp = new Date(data.timestamp)
      expect(timestamp).toBeInstanceOf(Date)
      expect(timestamp.getTime()).toBeGreaterThan(0)
    })
  })
})
