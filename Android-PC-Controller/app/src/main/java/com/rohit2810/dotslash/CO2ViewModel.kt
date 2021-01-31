package com.rohit2810.dotslash

import android.app.Application
import android.content.Context
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import java.lang.Exception

class CO2ViewModel(private val context: Context) : ViewModel() {

    private val viewModelJob = Job()

    private val coroutineScope = CoroutineScope(viewModelJob + Dispatchers.Main)

    private val _toastMsg = MutableLiveData<String>()
    val toastMsg: LiveData<String>
        get() = _toastMsg


    fun sleepPC(ip: String) {
        val co2Api: CO2Api = CO2Api.start(context, ip)
        ip?.let {
            coroutineScope.launch {
                try {
                    val res = co2Api.sleepPC()
                    Log.d("CO2ViewModel", res)
                    _toastMsg.value = res
                }catch (e: Exception) {
                    _toastMsg.value = e.localizedMessage
                }

            }
        }
    }

    fun shutdownPC(ip: String) {
        val co2Api: CO2Api = CO2Api.start(context, ip)
        ip?.let {
            coroutineScope.launch {
                try {
                    val res = co2Api.shutdownPC()
                    Log.d("CO2ViewModel", res)
                    _toastMsg.value = res
                }catch (e: Exception) {
                    _toastMsg.value = e.localizedMessage
                }

            }
        }
    }

    fun doneShowingToast() {
        _toastMsg.value = null
    }

}