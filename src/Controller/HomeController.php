<?php
namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends AbstractController{

    /**
     * @Route("/", name="homepage")
     */
    public function home() :Response{
       return $this->render('blog.html.twig');
    }


    /**
     * Controlleur pour le jeu
     * 
     * @Route("/jeu",name="jeu")
     */
    public function jeu(): Response{
        
        return $this->render('jeu.html.twig');
    }
}

