package beekeepingrunner.ecommerce.dao;

import beekeepingrunner.ecommerce.entity.Country;
import beekeepingrunner.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> {

    @CrossOrigin("http://localhost:4200")
    List<State> findByCountryCode(@Param("code") String code);
}
