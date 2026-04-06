package com.example.FoodAPI.controller;

import java.util.List;

import com.example.FoodAPI.repo.UpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.FoodAPI.model.Items;
import com.example.FoodAPI.service.ItemService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ItemController {
    private final ItemService service;

    @Autowired
    ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String greet() {
        return "Hello Developer, There is nothing that interesting here !!";
    }

    @GetMapping("/items")
    public ResponseEntity<?> getAllItems() {
        try{
            List<Items> ls = service.getAllItems();
            return new ResponseEntity<>(ls, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/additem")
    public ResponseEntity<?> addItem(@RequestPart Items item, @RequestPart MultipartFile imageFile) {
        try{
            System.out.println(item);
            Items resultItem = service.addItem(item, imageFile);
            return new ResponseEntity<>(resultItem, HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findmaxid")
    public ResponseEntity<Integer> getMaxId() {
        int data = service.getMaxId();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/getitem/{itemId}")
    public ResponseEntity<Items> getItemById(@PathVariable int itemId) {
        // System.out.println(itemId);
        Items item = service.getItemById(itemId);
        if(item != null){
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteitem/{itemId}")
    public ResponseEntity<String> deleteItem(@PathVariable int itemId) {
        service.deleteItem(itemId);
        return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);
    }

    @PutMapping("/updateitem/{itemId}")
    public ResponseEntity<String> updateItem(@PathVariable int itemId,@RequestBody UpdateDTO data){
        service.updateItem(itemId, data);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
