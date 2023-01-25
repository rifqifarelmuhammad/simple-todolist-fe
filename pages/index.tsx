import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import { Todolist } from '../models/todolist';
import axios from 'axios';
import Layout from '../components/layout'

export default function Home() {
  return (
    <>
    <Navbar />
    <Layout>
    </Layout>
    </>
  )
}
