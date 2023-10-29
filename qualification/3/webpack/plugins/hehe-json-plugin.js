import fs from 'fs';
import path from 'path';

class HeheAsJsonPlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(
      'HeheAsJsonPlugin',
      (normalModuleFactory) => {
        normalModuleFactory.hooks.beforeResolve.tap(
          'HeheAsJsonPlugin',
          (resolveData) => {
            if (!resolveData) return;

            const request = resolveData.request;

            if (/\.hehehe$/.test(request)) {
              const absolutePath = path.resolve(compiler.context, request);
              if (fs.existsSync(absolutePath)) {
                resolveData.type = 'javascript/auto';
              }
            }
          },
        );
      },
    );
  }
}

export const heheAsJsonPlugin = new HeheAsJsonPlugin();
