import pool from "../config/db.config";

const dbConnect = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(`==> Database connected on ${result.rows[0].now}`);
  } catch (err: any) {
    console.log(`==> Database connection failed - Error: ${err.message}`);
  }
}

export default dbConnect;