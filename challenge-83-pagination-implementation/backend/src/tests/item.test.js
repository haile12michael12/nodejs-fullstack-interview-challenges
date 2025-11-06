const ItemService = require('../app/services/item.service');
const ItemRepository = require('../app/repositories/item.repository');

describe('Item Service', () => {
  let itemService;
  let itemRepository;

  beforeEach(() => {
    itemService = new ItemService();
    itemRepository = new ItemRepository();
  });

  describe('getItems', () => {
    it('should return items with default pagination', async () => {
      const result = await itemService.getItems({});
      
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.total).toBeGreaterThan(0);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('should return items with custom pagination', async () => {
      const result = await itemService.getItems({ page: 2, limit: 5 });
      
      expect(result.items).toBeDefined();
      expect(result.page).toBe(2);
      expect(result.limit).toBe(5);
    });

    it('should respect maximum limit', async () => {
      const result = await itemService.getItems({ limit: 200 });
      
      expect(result.limit).toBe(100); // Max limit from config
    });
  });

  describe('getItemCount', () => {
    it('should return total item count', async () => {
      const count = await itemService.getItemCount();
      
      expect(count).toBeGreaterThan(0);
    });
  });
});