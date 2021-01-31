package com.rohit2810.dotslash

import android.content.Context
import android.util.Log
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.POST

interface CO2Api {
    @POST("computer_sleep")
    suspend fun sleepPC() : String

    @POST("shutdown")
    suspend fun shutdownPC(): String

    companion object {
         fun start(context: Context, ip: String): CO2Api {
             val base_url = "http://${ip}:5000/"
             Log.d("MainActivity", base_url)
            return Retrofit.Builder()
                .baseUrl(base_url)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(CO2Api::class.java)
        }
    }
}