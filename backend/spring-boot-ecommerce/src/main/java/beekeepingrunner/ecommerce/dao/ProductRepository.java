package beekeepingrunner.ecommerce.dao;

import beekeepingrunner.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
