package com.web.game.application;

import com.web.game.entity.rank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Component
public class impl implements repository {

    @Autowired
    private repositor Repositor;

    @Override
    public rank getRankByList(List<Integer> list) {
        return Repositor.findRankByList(list);
    }

    @Override
    public rank getRankById(String id) {
        return Repositor.findRankById(id);
    }

    @Override
    public rank getRank() {
        return rank.getInstance();
    }

    @Override
    public List<Integer> getRankList() {
        return rank.getInstance().getList();
    }

    @Override
    public void updateRank(int score) {
        List<Integer> list = new ArrayList<>(10);
        list = getRankList();
        Comparator<Integer> c = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return Integer.compare((int) o2, (int) o1);
            }
        };
        if(list.size()<10)
        {
            list.add(score);
        }
        else {
            list.sort(c);
            list.set(9, score);
        }
        list.sort(c);
        getRank().setList(list);
        //Repositor.save()
    }
}
