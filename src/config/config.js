// importar el paquete instalado
import { config } from 'dotenv'

config()

export const PORT = process.env.PORT
export const POSTGRES_URL = process.env.POSTGRES_URL