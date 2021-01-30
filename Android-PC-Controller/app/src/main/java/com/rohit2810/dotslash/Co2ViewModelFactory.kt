package com.rohit2810.dotslash

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider

class Co2ViewModelFactory(val context: Context) : ViewModelProvider.Factory {
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        if(modelClass.isAssignableFrom(CO2ViewModel::class.java)) {
            return CO2ViewModel(context) as T
        }
        throw IllegalArgumentException("Unable to convert CO2 view model")
    }
}