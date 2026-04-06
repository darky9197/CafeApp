package com.example.FoodAPI.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.FoodAPI.model.Items;

@Repository
public interface ItemRepository extends JpaRepository<Items,Integer> {
    @Query(value = "select max(item_id) from items", nativeQuery = true)
    int findMaxId();

//    @Query(value = "select * from items where item_id = :itemId", nativeQuery = true)
//    Items findItem(@Param("itemId") int itemId);
}
