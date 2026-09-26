import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { completeTask, getProgress, initializeDatabase, resetProgress } from "./db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  await initializeDatabase();
  const app = express();
  const server = createServer(app);
  app.use(express.json());

  const isWalletAddress = (value: string) => /^0x[a-fA-F0-9]{40}$/.test(value);
  const isTaskId = (value: string) => /^[a-z0-9-]{1,80}$/.test(value);

  app.get("/api/progress/:walletAddress", (req, res) => {
    const walletAddress = req.params.walletAddress.toLowerCase();
    if (!isWalletAddress(walletAddress)) {
      res.status(400).json({ error: "Invalid wallet address" });
      return;
    }
    res.json(getProgress(walletAddress));
  });

  app.post("/api/progress/:walletAddress/tasks/:taskId", (req, res) => {
    const walletAddress = req.params.walletAddress.toLowerCase();
    const { taskId } = req.params;
    if (!isWalletAddress(walletAddress) || !isTaskId(taskId)) {
      res.status(400).json({ error: "Invalid wallet address or task ID" });
      return;
    }
    res.status(201).json(completeTask(walletAddress, taskId));
  });

  app.delete("/api/progress/:walletAddress", (req, res) => {
    const walletAddress = req.params.walletAddress.toLowerCase();
    if (!isWalletAddress(walletAddress)) {
      res.status(400).json({ error: "Invalid wallet address" });
      return;
    }
    resetProgress(walletAddress);
    res.status(204).end();
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
