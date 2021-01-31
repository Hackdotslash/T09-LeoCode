package com.rohit2810.dotslash

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private lateinit var viewmodel: CO2ViewModel
    private lateinit var co2ViewModelFactory: Co2ViewModelFactory
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        co2ViewModelFactory = Co2ViewModelFactory(applicationContext)
        viewmodel = ViewModelProvider(this, co2ViewModelFactory).get(CO2ViewModel::class.java)
//        172.30.55.138
        btn_sleep.setOnClickListener {
            val ip = et_IP.text.toString()
            Log.d("MainActivity", ip)
            ip?.let {
                viewmodel.sleepPC(it)
            }
        }

        btn_shutdown.setOnClickListener {
            val ip = et_IP.text.toString()
            ip?.let {
                viewmodel.shutdownPC(it)
            }
        }

        viewmodel.toastMsg.observe(this, Observer {
            it?.let {
                Toast.makeText(this, it, Toast.LENGTH_LONG).show()
                viewmodel.doneShowingToast()
            }
        })
    }
}