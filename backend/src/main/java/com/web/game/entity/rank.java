package com.web.game.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection="rank")
public class rank {
    @Id
    private String id;
    private List<Integer> list;
    private static rank instance;

    private rank()
    {
        list = new ArrayList<>(10);
    }

    public static rank getInstance()
    {
        if (instance == null) {
            instance = new rank();
        }
        return instance;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public List<Integer> getList() {
        return list;
    }
    public void setList(List<Integer> list) {
        this.list = list;
    }

}
