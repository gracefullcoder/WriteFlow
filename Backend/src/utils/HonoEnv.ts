type Environment = {
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    prisma: any,
    id: any
  }
}

export default Environment