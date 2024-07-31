package com.musicplayer.controller;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.razorpay.*;

import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    @PostMapping("/create_order")
    @ResponseBody
    public String createOrder(@RequestBody Map<String, Object> data) throws RazorpayException{
        System.out.println(data);
        int amt = Integer.parseInt(data.get("amount").toString());

        var client = new RazorpayClient("key_id", "key_secret");
        JSONObject ob = new JSONObject();
        ob.put("amount", amt*100);
        ob.put("currency", "INR");
        ob.put("receipt", "txn_123456");

        Order order = client.Orders.create(ob);
        return order.toString();
    }
}