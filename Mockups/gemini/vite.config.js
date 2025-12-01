import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to save experiment data locally
const saveExperimentDataPlugin = () => ({
  name: 'save-experiment-data',
  configureServer(server) {
    server.middlewares.use('/api/save-data', (req, res, next) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString() });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            // Create filename: participant_[TIMESTAMP]_[CONDITION].json
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `participant_${timestamp}_${data.condition}.json`;
            const dir = path.join(process.cwd(), 'experiment_data');
            
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }

            fs.writeFileSync(path.join(dir, filename), JSON.stringify(data, null, 2));
            
            console.log(`[Experiment] Data saved to ${filename}`);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, filename }));
          } catch (error) {
            console.error('[Experiment] Error saving data:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to save data' }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    saveExperimentDataPlugin() // Register the custom plugin
  ],
})