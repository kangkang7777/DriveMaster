package com.web.game.adapter;

import com.web.game.application.application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value="/rank")
public class rankController {
    private final application rankApplication;

    @Autowired
    public rankController(application rankApplication) {
        this.rankApplication = rankApplication;
    }

    @PostMapping
    public List<Integer> updateRankAndGetRank(@RequestParam String score)
    {
         rankApplication.updateRank(Integer.parseInt(score));
         return rankApplication.getRank();
    }

    @PostMapping("/updateRank")
    public void updateRank(@RequestParam String score)
    {
        rankApplication.updateRank(Integer.parseInt(score));
    }

    @GetMapping("/getRank")
    public List<Integer> getRank()
    {
        return rankApplication.getRank();
    }


}
