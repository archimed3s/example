import type { NextApiRequest, NextApiResponse } from 'next';

import { apiRouteHandler } from '@api/middleware';
import { Lobby } from '@sharedTypes/api';

/**
 * @swagger
 * /api/lobby/gameFilters:
 *   get:
 *     tags: ["Lobby"]
 *     description: Get lobby game filters
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: LobbyGameFiltersResponse
 *               properties:
 *                 categories:
 *                   title: Categories
 *                   type: array
 *                   items:
 *                     schema:
 *                       type: object
 *                       title: GameCategory
 *                       properties:
 *                         id:
 *                           title: Id
 *                           type: string
 *                         name:
 *                           title: Name
 *                           type: string
 *                         description:
 *                           title: Description
 *                           type: string
 *                         is_active:
 *                           title: IsActive
 *                           type: boolean
 *                         parent_category_id:
 *                           title: ParentCategory
 *                           type: number
 *                 providers:
 *                   title: Providers
 *                   type: array
 *                   items:
 *                     schema:
 *                       type: object
 *                       title: GameProvider
 *                       properties:
 *                         id:
 *                           title: Id
 *                           type: string
 *               required:
 *               - categories
 *               - providers
 */
export default apiRouteHandler({
  get: async (_req: NextApiRequest, res: NextApiResponse<Lobby.LobbyGameFiltersResponse>) => {
    const gameCategories: any = 'test';
    const gameOperatorProviders: any = 'test';

    res.status(200).json({
      categories: gameCategories.map((category: any) => ({
        id: Number(category.id),
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        parentCategory: category.parent_category_id,
        slug: category.slug,
      })),
      providers: gameOperatorProviders.map((provider: any) => ({
        id: provider.id,
      })),
    });
  },
});
