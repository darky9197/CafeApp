package com.example.FoodAPI.service;

import com.example.FoodAPI.model.Items;
import com.example.FoodAPI.repo.ItemRepository;
import com.example.FoodAPI.repo.UpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepository repo;

    @Autowired
    ItemService(ItemRepository repo) {
        this.repo = repo;
    }

    public List<Items> getAllItems() {
        return repo.findAll();
    }

    public Items addItem(Items item, MultipartFile imageFile) throws IOException {
        item.setImageName(imageFile.getOriginalFilename());
        item.setImageType(imageFile.getContentType());
        item.setImageData(imageFile.getBytes());
        return repo.save(item);
    }

    public int getMaxId(){
        return repo.findMaxId();
    }

    public void deleteItem(int itemId){
        repo.deleteById(itemId);
    }

    public Items getItemById(int itemId){
        Optional<Items> itemOptional = repo.findById(itemId);
        if(itemOptional.isPresent()){
            return itemOptional.get();
        }
        throw new RuntimeException("Product not found with id: " + itemId);
    }

    public void updateItem(int itemId, UpdateDTO data) throws RuntimeException {
        Items item = repo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item Not Found!!"));

        item.setItemName(data.itemName());
        item.setPrice(data.price());
        item.setQuantity(data.quantity());

        repo.save(item);
    }
}
